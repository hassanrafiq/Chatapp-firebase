var ref= firebase.database().ref("user");
var tbl=document.getElementById("tbl");

getdata();

function getdata(){


    ref.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
      console.log(childKey);
      console.log(childData);
    
    
          var tr=document.createElement("tr");
          var td1=document.createElement("td");
          var td2=document.createElement("td"); 
          
    
                tbl.append(tr);
                tr.append(td1);
                tr.append(td2);
                td1.append(childData.name);
                td2.append(childData.email);

             
        });
      });
    
    
    }

let signup = ()=> {
    let name = document.getElementById("name")
    let email = document.getElementById("email")
    let password = document.getElementById("password")

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then((result) => {
    console.log(result)
    var user ={
        "name":name.value,
        "email":email.value,

    };

    ref.push(user);
}).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errormessage)
       
      });
}

let login = ()=> {

    let email = document.getElementById("login-email")
    let password = document.getElementById("login-password")

    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((result) => {
        console.log("user login succesfully");
        window.location.href="chatapp/index.html";
        console.log(result)
        
    })


    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console,log(errormessage)
        // ...
      });
}


const facebook_login = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        console.log("user===>,",user)

    
   
        if(user!=""){

            window.location.href="chatapp/index.html";
            getdata();
        }
        // ...
      }).catch(function(error) {
        console.log(error.message)
      });
}



const signout= () =>{

    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("sign out");
        window.location.href="index.html";
       
      }).catch(function(error) {
        // An error happened.
        console.log("sign out error "+error.message);
      });

}

  
      

  