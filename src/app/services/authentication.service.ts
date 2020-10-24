import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
@Injectable({
    providedIn:'root'
})



export class AuthenticationService{
    userData:firebase.User;
    constructor(private fireAuth:AngularFireAuth, private zone:NgZone,private router:Router,private storage:AngularFireStorage){
        this.fireAuth.authState.subscribe((res)=>{
            if(res){
              this.userData = res;
              localStorage.setItem('user', JSON.stringify(this.userData));
            }else{
              localStorage.setItem('user',null);
            }
          })
    }

    sendUserData():firebase.User{
        return this.userData;
    }
    isLoggedIn(){
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null && user.emailVerified !== false) ? true : false;
    }


    isVerfiedJSON(){
        const user = JSON.parse(localStorage.getItem('user'));
        if(user !== null){
           return { loggedIn:true,verified:user.emailVerified}
        }else{
            return {loggedIn:false};
        }
    }

    async signIn(email,password){
       try{
        let response =  await this.fireAuth.signInWithEmailAndPassword(email,password);
        console.log(response);
        localStorage.setItem('user',JSON.stringify(response.user))
        if(this.isLoggedIn()){
            this.routeToLandingPage();
        }else{
            console.log('Data check')
        }
       }catch(err){
        console.log(err);
        window.alert(err.message);
       }
    }
    async signUp(email,password){
        try{
         let response =  await this.fireAuth.createUserWithEmailAndPassword(email,password);
         console.log(response);
         localStorage.setItem('user',JSON.stringify(response.user))
         return Promise.resolve(response);
        }catch(err){
         console.log(err);
         window.alert(err.message);
        }
     }

     async verificationMail(){
         try{
            let response = await (await this.fireAuth.currentUser).sendEmailVerification();
            return Promise.resolve(response);
         }catch(err){
            console.log(err);

         }
     }

     async getUserObject(){
         let user =  (await this.fireAuth.currentUser);
         return user;
     }

     async updateImageUrl(user,imageurl){
        this.fireAuth.updateCurrentUser({
            ...user,
            photoURL:imageurl
        }).then((res)=>{

        }, err=>{
             console.log(err);
        })
     }

     async uploadProfilePic(eve){
       let  user = await this.getUserObject();
       let uid =  (user).uid;
       let path =  'profiles/'+uid +'/profile.jpg';
       const ref = this.storage.ref(path);
       this.storage.upload(path,eve).snapshotChanges().pipe(
           finalize(()=>{
               ref.getDownloadURL().subscribe((res)=>{
                  let imageurl:string = res;
                  this.updateImageUrl(user,imageurl)
               })
           })
       ).subscribe()
     }

     async signOut(){
         try{
            await this.fireAuth.signOut();
            localStorage.removeItem('user');
            this.router.navigate(['login']);
         }catch(err){
            console.log(err);
            window.alert(err.message);  
         }
     }

     routeToVerifyPage(){
         return this.router.navigate(['verifyemail'])
     }

    routeToLandingPage(){
        return this.router.navigate(['landingpage'])
    }
}