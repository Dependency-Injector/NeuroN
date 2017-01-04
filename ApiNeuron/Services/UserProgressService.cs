using System;
using ApiNeuron.Common.Enums;
using ApiNeuron.Models;
using ApiNeuron.Repositories;

namespace ApiNeuron.Services
{
    public class UserProgressService : IUserProgressService
    {
        private IRepository<UserProgress> progressRepository;
        private IRepository<Avatar> avatarRepository;

        private const int TaskCompletionBaseXp = 10;
        private const int TaskCreationBaseXp = 4;
        private const int BlogPostCreationBaseXp = 15;

        public UserProgressService(IRepository<Avatar> avatarRepository, IRepository<UserProgress> progressRepository)
        {
            this.avatarRepository = avatarRepository;
            this.progressRepository = progressRepository;
        }

        public void ApplyUserProgress(ProgressSource source, int? associatedEntityId)
        {
            // Calculate how many points user will get
            decimal multiplier = GetRandomMultiplier();
            decimal gainedXp = GetBaseXpFor(source) * multiplier;

            // Create progress object for storing data about single experience gain, and save it
            UserProgress progressUnit = new UserProgress();
            progressUnit.Occured = DateTime.Now;
            progressUnit.Source = source;
            progressUnit.Xp = gainedXp;
            progressUnit.XpMultiplier = multiplier;

            if (associatedEntityId.HasValue)
                progressUnit.AssociatedEntityId = associatedEntityId.Value;

            progressRepository.Add(progressUnit);

            // Get appropriate user and give him xp points
            Avatar currentUser = avatarRepository.Get(TaskService.MyAvatarId);
            currentUser.Xp += progressUnit.Xp;

            // Check if he reached new level, update level if so
            if (HasEnoughXpForNextLevel(currentUser))
                currentUser.Level = CalculateUserLevel(currentUser);

            // Save user entity
            avatarRepository.Update(currentUser);
        }

        private decimal GetRandomMultiplier()
        {
            int minMultiplier = 7;
            int maxMultiplier = 13;

            Random randomGenerator = new Random();
            decimal randomNumber = randomGenerator.Next(minMultiplier, maxMultiplier) / (decimal)10;
            return randomNumber;
        }

        private decimal GetBaseXpFor(ProgressSource source)
        {
            decimal baseXp = 0;

            switch (source)
            {
                case ProgressSource.TaskCreation:
                    baseXp = TaskCreationBaseXp;
                    break;

                case ProgressSource.TaskCompletion:
                    baseXp = TaskCompletionBaseXp;
                    break;

                case ProgressSource.BlogPostCreation:
                    baseXp = BlogPostCreationBaseXp;
                    break;

                default:
                    baseXp = 5;
                    break;
            }

            return baseXp;
        }

        private bool HasEnoughXpForNextLevel(Avatar user)
        {
            return user.Xp > user.Level * 100;
        }

        private int CalculateUserLevel(Avatar user)
        {
            if (HasEnoughXpForNextLevel(user))
                return (int)Math.Floor(user.Xp / 100);

            return user.Level;
        }
    }
}

