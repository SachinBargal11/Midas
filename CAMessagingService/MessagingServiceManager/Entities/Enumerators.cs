namespace MessagingServiceManager.Entities
{
    public enum MessageDeliveryStatus
    {
        Scheduled = 1,
        Delivered = 2,
        Failed = 3
    }

    public enum DataOperationStatus
    {
        SavedSuccessfully = 1,
        RecordNotExist = 2,
    }
}
