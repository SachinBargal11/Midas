namespace MessagingService
{
    partial class ProjectInstaller
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;
        private System.ServiceProcess.ServiceProcessInstaller serviceProcessInstaller;
        private System.ServiceProcess.ServiceInstaller SMSService;
        private System.ServiceProcess.ServiceInstaller EMailService;

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.serviceProcessInstaller = new System.ServiceProcess.ServiceProcessInstaller();
            
            
            // serviceProcessInstaller1
            this.serviceProcessInstaller.Account = System.ServiceProcess.ServiceAccount.LocalSystem;
            this.serviceProcessInstaller.Password = null;
            this.serviceProcessInstaller.Username = null;
            
            // SMSService
            this.SMSService = new System.ServiceProcess.ServiceInstaller();
            this.SMSService.StartType = System.ServiceProcess.ServiceStartMode.Automatic;
            this.SMSService.DisplayName = "CA SMS Delivery Service";
            this.SMSService.ServiceName = "CA SMS Delivery Service";
            this.SMSService.Description = "Reads SMS message queue and delivers to recipients";
            
            // EMailService
            this.EMailService = new System.ServiceProcess.ServiceInstaller();
            this.EMailService.StartType = System.ServiceProcess.ServiceStartMode.Automatic;
            this.EMailService.DisplayName = "CA Email Delivery Service";
            this.EMailService.ServiceName = "CA Email Delivery Service";
            this.EMailService.Description = "Reads EMail message queue and delivers to recipients";

            // ProjectInstaller
            this.Installers.AddRange(new System.Configuration.Install.Installer[] {
            this.serviceProcessInstaller,
            this.SMSService,
            this.EMailService});
        }

        #endregion
    }
}