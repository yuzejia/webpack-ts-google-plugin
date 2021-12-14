export default class bgExtCLass {
    private static instance : bgExtCLass

    public static getInstance(): bgExtCLass {
     if (this.instance == null) {
         this.instance = new bgExtCLass()
     }
     return this.instance
    }

    init() {
        console.log("google bg ext init")
        
    }
    
}