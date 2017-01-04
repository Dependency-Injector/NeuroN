namespace ApiNeuron.Services
{
    public interface IUserProgressService
    {
        void ApplyUserProgress(Common.Enums.ProgressSource source, int? associatedEntityId);
    }
}
