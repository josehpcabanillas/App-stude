import { storageProvider } from '../services/storage/LocalStorageProvider';

const DEFAULT_USER = {
  name: 'Andrea',
  email: 'andrea.postula@gmail.com',
  whatsapp: '987654321',
  university: 'UNTRM',
  career: 'Estomatología',
  area: 'Ciencias de la Salud',
  examDaysLeft: 84,
  dailyGoalMinutes: 20,
  avatar: 'owl',
  xp: 420,
  streak: 12,
  streakAtRisk: false,
  hearts: 4,
  maxHearts: 5,
  gems: 160,
  rank: 'Aplicado',
  level: 3,
  onboardingCompleted: true,
};

class UserRepository {
  constructor(storage = storageProvider) {
    this.storage = storage;
    this.key = 'user_profile';
  }

  async getUser() {
    const user = await this.storage.getItem(this.key, null);
    if (!user) {
      await this.storage.setItem(this.key, DEFAULT_USER);
      return DEFAULT_USER;
    }
    return user;
  }

  async saveUser(user) {
    await this.storage.setItem(this.key, user);
    return user;
  }

  async updateStats(partialStats) {
    const current = await this.getUser();
    const updated = { ...current, ...partialStats };
    await this.storage.setItem(this.key, updated);
    return updated;
  }
}

export const userRepository = new UserRepository();
