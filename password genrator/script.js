class pasword{
    constructor(){
        console.log("welcom to password genrator");
        this.pass=""
    }
    genrator(len){
        let chars="abcdefghijklmnopqrstuvwxyz";
        let number="123456789";
        let spacial="!@#$&*()";
        if(len<3){
            console.log("your password shold be atlest 3 charcter lon");
        }
        else{
            let i=0;
            while(i<len){
                this.pass+=chars[Math.floor(Math.random()*chars.length)]
                this.pass+=number[Math.floor(Math.random()*number.length)]
                this.pass+=spacial[Math.floor(Math.random()*spacial.length)]
                i+=3
            }
            this.pass=this.pass.substr(0,len);
            return this.pass;
        }
    }
}
let p=new pasword()
console.log(p.genrator(7));