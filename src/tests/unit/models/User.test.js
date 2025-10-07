const User = require('../../../models/User.model');

describe('User Model', () => {
  describe('User Creation', () => {
    it('should create a user with valid data', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser.name).toBe(userData.name);
      expect(savedUser.email).toBe(userData.email);
      expect(savedUser.password).not.toBe(userData.password); // Should be hashed
      expect(savedUser.role).toBe('user'); // Default role
      expect(savedUser.isActive).toBe(true); // Default active
    });

    it('should not create a user without required fields', async () => {
      const user = new User({});
      
      await expect(user.save()).rejects.toThrow();
    });

    it('should not create a user with invalid email', async () => {
      const userData = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123',
      };

      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });
  });

  describe('User Methods', () => {
    let user;

    beforeEach(async () => {
      user = new User({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });
      await user.save();
    });

    it('should compare password correctly', async () => {
      const isMatch = await user.comparePassword('password123');
      expect(isMatch).toBe(true);

      const isNotMatch = await user.comparePassword('wrongpassword');
      expect(isNotMatch).toBe(false);
    });

    it('should return public profile without sensitive data', () => {
      const profile = user.getPublicProfile();
      
      expect(profile.password).toBeUndefined();
      expect(profile.__v).toBeUndefined();
      expect(profile.name).toBe(user.name);
      expect(profile.email).toBe(user.email);
    });

    it('should find user by email', async () => {
      const foundUser = await User.findByEmail('john@example.com');
      expect(foundUser).toBeTruthy();
      expect(foundUser.email).toBe('john@example.com');

      const notFound = await User.findByEmail('notfound@example.com');
      expect(notFound).toBeNull();
    });
  });
});
