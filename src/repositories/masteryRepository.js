import { storageProvider } from '../services/storage/LocalStorageProvider';

/**
 * Model: UserTopicMastery
 * Represents student's granular mastery, practice history, and spaced review scheduler per academic topic.
 *
 * @typedef {Object} UserTopicMastery
 * @property {string} topicId - e.g. 'citologia', 'bioelementos'
 * @property {string} topicName - Human readable name
 * @property {string} courseId - e.g. 'biologia'
 * @property {number} unitNumber - e.g. 2
 * @property {number} masteryScore - Percentage 0 to 100
 * @property {string} lastPracticed - ISO timestamp
 * @property {string} nextReviewDate - ISO timestamp
 * @property {number} correctCount - Number of correct answers
 * @property {number} mistakeCount - Number of wrong answers
 * @property {string} status - 'mastered' | 'review_needed' | 'learning' | 'unstarted'
 */

const DEFAULT_TOPIC_MASTERIES = [
  {
    topicId: 'citologia',
    topicName: 'Célula Eucariota y Organelos',
    courseId: 'biologia',
    unitNumber: 2,
    masteryScore: 65,
    lastPracticed: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    nextReviewDate: new Date(Date.now() - 2 * 3600 * 1000).toISOString(), // Due for review now!
    correctCount: 14,
    mistakeCount: 3,
    status: 'learning',
  },
  {
    topicId: 'bioelementos',
    topicName: 'Bioelementos y Agua',
    courseId: 'biologia',
    unitNumber: 2,
    masteryScore: 80,
    lastPracticed: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    nextReviewDate: new Date(Date.now() - 6 * 3600 * 1000).toISOString(), // Due for review!
    correctCount: 18,
    mistakeCount: 2,
    status: 'review_needed',
  },
  {
    topicId: 'fundamentos',
    topicName: 'Características de los Seres Vivos',
    courseId: 'biologia',
    unitNumber: 1,
    masteryScore: 100,
    lastPracticed: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    nextReviewDate: new Date(Date.now() + 96 * 3600 * 1000).toISOString(), // In 4 days
    correctCount: 25,
    mistakeCount: 0,
    status: 'mastered',
  },
  {
    topicId: 'metabolismo',
    topicName: 'Metabolismo Celular y ATP',
    courseId: 'biologia',
    unitNumber: 4,
    masteryScore: 35,
    lastPracticed: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    nextReviewDate: new Date(Date.now() - 1 * 3600 * 1000).toISOString(), // Due for review!
    correctCount: 4,
    mistakeCount: 6,
    status: 'learning',
  },
  {
    topicId: 'genetica',
    topicName: 'Genética y Leyes de Mendel',
    courseId: 'biologia',
    unitNumber: 6,
    masteryScore: 40,
    lastPracticed: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    nextReviewDate: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    correctCount: 5,
    mistakeCount: 5,
    status: 'learning',
  },
];

class MasteryRepository {
  constructor(storage = storageProvider) {
    this.storage = storage;
    this.collectionKey = 'user_topic_mastery';
  }

  async getAllMasteries() {
    const data = await this.storage.getItem(this.collectionKey, null);
    if (!data) {
      await this.storage.setItem(this.collectionKey, DEFAULT_TOPIC_MASTERIES);
      return DEFAULT_TOPIC_MASTERIES;
    }
    return data;
  }

  async getTopicMastery(topicId) {
    const list = await this.getAllMasteries();
    return list.find(m => m.topicId === topicId) || null;
  }

  /**
   * Updates topic mastery based on quiz / practice answers
   * and calculates new spaced review interval.
   */
  async recordPracticeResult(topicId, isCorrect) {
    const list = await this.getAllMasteries();
    const now = new Date();

    const updated = list.map(item => {
      if (item.topicId !== topicId) return item;

      const newCorrect = item.correctCount + (isCorrect ? 1 : 0);
      const newMistakes = item.mistakeCount + (isCorrect ? 0 : 1);
      const total = newCorrect + newMistakes;
      const rawScore = total > 0 ? Math.round((newCorrect / total) * 100) : item.masteryScore;

      // Spaced review calculation:
      // If correct: schedule review forward by 1, 3, or 7 days based on mastery
      // If mistake: schedule review immediately (today/tomorrow)
      let hoursUntilReview = 24;
      if (isCorrect) {
        if (rawScore >= 80) hoursUntilReview = 72; // 3 days
        if (rawScore >= 95) hoursUntilReview = 168; // 7 days
      } else {
        hoursUntilReview = 4; // Need immediate review
      }

      const nextReview = new Date(now.getTime() + hoursUntilReview * 3600 * 1000).toISOString();

      let status = 'learning';
      if (rawScore >= 90) status = 'mastered';
      else if (new Date(nextReview) <= now) status = 'review_needed';

      return {
        ...item,
        masteryScore: rawScore,
        lastPracticed: now.toISOString(),
        nextReviewDate: nextReview,
        correctCount: newCorrect,
        mistakeCount: newMistakes,
        status,
      };
    });

    await this.storage.setItem(this.collectionKey, updated);
    return updated.find(m => m.topicId === topicId);
  }

  /**
   * Powers "¿Qué debería estudiar ahora?"
   * Returns the single highest priority topic for the student:
   * 1. Overdue for review with mastery < 80%
   * 2. Lowest mastery score among active topics
   */
  async getWhatToStudyNow() {
    const list = await this.getAllMasteries();
    const now = new Date();

    // 1. Check for overdue topics that need reinforcement
    const overdue = list
      .filter(m => new Date(m.nextReviewDate) <= now && m.masteryScore < 90)
      .sort((a, b) => a.masteryScore - b.masteryScore);

    if (overdue.length > 0) {
      return {
        topic: overdue[0],
        reason: 'REPASO_URGENTE',
        estimatedMinutes: 5,
        badgeText: 'Retención baja · Repaso sugerido',
      };
    }

    // 2. Active learning topic with lowest mastery
    const inProgress = list
      .filter(m => m.status === 'learning' || m.masteryScore < 80)
      .sort((a, b) => a.masteryScore - b.masteryScore);

    if (inProgress.length > 0) {
      return {
        topic: inProgress[0],
        reason: 'CONTINUAR_RUTA',
        estimatedMinutes: 5,
        badgeText: 'Continúa tu ruta',
      };
    }

    // Default fallback
    return {
      topic: list[0],
      reason: 'AVANZAR',
      estimatedMinutes: 5,
      badgeText: 'Próxima lección',
    };
  }

  /**
   * Powers "Repaso inteligente": returns all topics due for review
   */
  async getTopicsDueForReview() {
    const list = await this.getAllMasteries();
    const now = new Date();
    return list.filter(m => new Date(m.nextReviewDate) <= now || m.status === 'review_needed');
  }
}

export const masteryRepository = new MasteryRepository();
