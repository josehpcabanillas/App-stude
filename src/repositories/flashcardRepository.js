import { storageProvider } from '../services/storage/LocalStorageProvider';
import { INITIAL_FLASHCARDS } from '../data/flashcardsData';

class FlashcardRepository {
  constructor(storage = storageProvider) {
    this.storage = storage;
    this.key = 'flashcards_srs';
  }

  async getAll() {
    const list = await this.storage.getItem(this.key, null);
    if (!list) {
      // Seed with initial spaced repetition timestamps
      const seeded = INITIAL_FLASHCARDS.map((fc, idx) => ({
        ...fc,
        intervalMinutes: 60 * (idx + 1),
        easeFactor: 2.5,
        repetitionCount: idx,
        nextReviewDate: new Date(Date.now() + (idx === 0 ? -1000 : idx * 3600 * 1000)).toISOString(),
      }));
      await this.storage.setItem(this.key, seeded);
      return seeded;
    }
    return list;
  }

  /**
   * Spaced Repetition Rating Handler
   * @param {string} id - Flashcard ID
   * @param {'no_sabia' | 'dude' | 'facil'} rating
   */
  async rateFlashcard(id, rating) {
    const list = await this.getAll();
    const now = new Date();

    const updated = list.map(card => {
      if (card.id !== id) return card;

      let intervalMinutes = card.intervalMinutes || 60;
      let easeFactor = card.easeFactor || 2.5;
      let repCount = card.repetitionCount || 0;
      let retentionScore = card.retentionScore || 50;

      if (rating === 'no_sabia') {
        // Reset interval to 10 minutes (repeat soon today)
        intervalMinutes = 10;
        easeFactor = Math.max(1.3, easeFactor - 0.2);
        repCount = 0;
        retentionScore = Math.max(10, retentionScore - 25);
      } else if (rating === 'dude') {
        // 1 day interval (1440 minutes)
        intervalMinutes = 1440;
        repCount += 1;
        retentionScore = Math.min(80, retentionScore + 10);
      } else if (rating === 'facil') {
        // 3 days or scaled interval
        if (repCount === 0) intervalMinutes = 1440 * 3; // 3 days
        else intervalMinutes = Math.round(intervalMinutes * easeFactor);
        easeFactor += 0.15;
        repCount += 1;
        retentionScore = Math.min(100, retentionScore + 25);
      }

      const nextReviewDate = new Date(now.getTime() + intervalMinutes * 60 * 1000).toISOString();
      const status = retentionScore >= 80 ? 'mastered' : (intervalMinutes <= 60 ? 'learning' : 'review');

      return {
        ...card,
        intervalMinutes,
        easeFactor,
        repetitionCount: repCount,
        retentionScore,
        nextReviewDate,
        lastReviewed: now.toISOString(),
        status,
      };
    });

    await this.storage.setItem(this.key, updated);
    return updated.find(c => c.id === id);
  }

  async getDueForReview() {
    const list = await this.getAll();
    const now = new Date();
    return list.filter(c => new Date(c.nextReviewDate) <= now);
  }
}

export const flashcardRepository = new FlashcardRepository();
