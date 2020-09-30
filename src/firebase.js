/* eslint-disable no-unused-vars */
// import firebase from 'firebase';
import app from 'firebase/app';
import databse from 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDLWOVsf0voqWAfaBSm2YV8Nc2vFjsWWeI",
  authDomain: "odeliveryio2.firebaseapp.com",
  databaseURL: "https://odeliveryio2.firebaseio.com",
  projectId: "odeliveryio2",
  storageBucket: "odeliveryio2.appspot.com",
  messagingSenderId: "355804492158",
  appId: "1:355804492158:web:f9cc73f6e54909cd6a432f",
  measurementId: "G-7YSBSBFSGE"
}

class Firebase {
    constructor() {
      app.initializeApp(firebaseConfig);
      // this.firebaseDB =  app.database().ref();
      this.auth = app.auth();
      this.db = app.firestore();
      //this.firebaseDB = firebase.database().ref()
    }
  
    login = (email, password) => this.auth.signInWithEmailAndPassword(email, password)
  
    logout = () => this.auth.signOut();
  
    async register(name, email, password){
      await this.auth.createUserWithEmailAndPassword(email, password);
      return this.auth.currentUser.updateProfile({
        displayName: name
      })
    }
  
    addPersonalData(data) {
      if (!this.auth.currentUser)
        return alert('Not Authorized');
      return this.db.doc(`users_personal_data/${this.auth.currentUser.uid}`).set({
        data,
        products: []
      });
    }

    // -------------------- Product Functions -----------------------------

    async addProduct (product) {
      if (!this.auth.currentUser)
        return alert('Not Authorized');
      const doc = await this.db.collection('users_personal_data').doc(this.auth.currentUser.uid).get();
      const products = doc.get('products');
      const newProducts = [...products];
      newProducts.push(product);
      return this.db.collection('users_personal_data').doc(this.auth.currentUser.uid).set({
        products: newProducts,
      }, { merge: true });      
    }

    async editProduct (product, id) {
      if (!this.auth.currentUser)
        return alert('Not Authorized');
      const doc = await this.db.collection('users_personal_data').doc(this.auth.currentUser.uid).get();
      const products = doc.get('products');
      const newProducts = products.map(prod => {
        console.log(id);
        if (prod.id === id){
          console.log('found it');
          return product;
        }
        return prod;
      })
      return this.db.doc(`users_personal_data/${this.auth.currentUser.uid}`).set({
        products: newProducts
      }, {merge: true});
    }

    async deleteProduct (id) {
      if (!this.auth.currentUser)
        return alert('Not Authorized');
        const doc = await this.db.collection('users_personal_data').doc(this.auth.currentUser.uid).get();
        const products = doc.get('products');
        const newProducts = [...products];
        newProducts.splice(id, 1);
        return this.db.doc(`users_personal_data/${this.auth.currentUser.uid}`).set({
          products: newProducts
        }, {merge: true});
    }

    // --------------------------------------------------------------------

    // -------------------- Shipment Functions ----------------------------

    getShipments () {
      const authUid = this.auth.currentUser.uid;
      const shipments = this.db.collection('shipments')
      .get()
      .then(snap => {
        const data = []
        snap.forEach(doc => {
          if(authUid === doc.data().clientID) {
            data.push({...doc.data(), id: doc.id});
          }
        });
        console.log(data);
        return data;
      });
      return shipments;
    }


    async editShipment (shipment, id) {
      if (!this.auth.currentUser)
        return alert('Not Authorized');
      return  await this.db.collection('shipments').doc(id).set({
          ...shipment
        }, { merge: true });
    }

    async addShipment (shipment) {
      if (!this.auth.currentUser)
        return alert('Not Authorized');
      const doc = this.db.collection('shipments').doc();
      return await doc.set({
            ...shipment
          }).then(() => {
            return doc.id;
          });
    }


    async deleteShipment (id) {
      if (!this.auth.currentUser)
        return alert('Not Authorized');
      return await this.db.collection('shipments').doc(id).delete();
    }

    async deleteShipmentByProductID(id) {
      if (!this.auth.currentUser)
        return alert('Not Authorized');
        const authUid = this.auth.currentUser.uid;
        const shipments = await this.db.collection('shipments')
        .get()
        .then(snap => {
          const data = []
          snap.forEach(doc => {
            if(authUid === doc.data().clientID && id === doc.data().productID && 
            doc.data().status === "Preparing") {
              data.push(doc.id);
            }
          });
          return data;
        });
        shipments.map(id => {
          return this.db.collection('shipments').doc(id).delete();
        });
    }

  // -------------------- Tickets Functions ----------------------------


  async editTicket (ticket, id) {
    if (!this.auth.currentUser)
      return alert('Not Authorized');
    return  await this.db.collection('tickets').doc(id).set({
        ...ticket
      });
  }

  async addTicket (ticket) {
    if (!this.auth.currentUser)
      return alert('Not Authorized');
    return await this.db.collection('tickets').doc().set({
          ...ticket
        });
  }


  async deleteTicket (id) {
    if (!this.auth.currentUser)
      return alert('Not Authorized');
    return await this.db.collection('tickets').doc(id).delete();
  }

    // -------------------------- User Functions ------------------------------------------

    isInitialized () {
      return new Promise(res => {
        this.auth.onAuthStateChanged(res);
      });
    }

    getCurrentUsername() {
      return this.auth.currentUser && this.auth.currentUser.displayName;
    }
  
    async getCurrentUserData () {
      const authUid = this.auth.currentUser.uid;
      const doc = await this.db.collection('users_personal_data').doc(authUid).get();
      const data = doc.get('data');
      const products = doc.get('products');
      /*const shipments = await this.db.collection('shipments').onSnapshot(snap => {
          const data = []
          snap.forEach(doc => {
            console.log(doc.data());
            if(authUid === doc.data().clientID) {
              data.push({...doc.data(), id: doc.id});
            }
          });
          console.log("TestDone");
          return data;
      });*/
      const shipments = await this.db.collection('shipments').get()
      .then(snap => {
        const data = []
        snap.forEach(doc => {
          console.log(doc.data());
          if(authUid === doc.data().clientID) {
            data.push({...doc.data(), id: doc.id});
          }
        });
        return data;
      });
      const tickets = await this.db.collection('tickets')
      .get()
      .then(snap => {
        const data = []
        snap.forEach(doc => {
          data.push({...doc.data(), id: doc.id});
        });
        return data;
      });
      const bills = await this.db.collection('bills')
      .get()
      .then(snap => {
        const data = [];
        snap.forEach(bill => {
          data.push({...bill.data(), id: bill.id})
        });
        return data;
      })
      return {
        id: doc.id,
        data: {...data, fullName: this.auth.currentUser.displayName},
        products: [...products],
        shipments: [...shipments],
        tickets: [...tickets],
        bills: [...bills]

      };
    }
}
  
export default new Firebase();

/*
function CRUD:
READ : firebaseDb.child('contact').on('value', snapshot => {
            // console.log(snapshot.val());
            if(snapshot.val() !== null)
            {
                setContactObjects({
                    ...snapshot.val()
                })
            }
            else
                setContactObjects({});
        });
CREATE: firebaseDb.child('contact').push(
                obj,
                err => {
                    if(err)
                        console.log(err);
                    else
                        setCurretID('');
                }
            )
UPDATE: firebaseDb.child(`contact/${curretID}`).set(
                obj,
                err => {
                    if(err)
                        console.log(err);
                    else
                        setCurretID('');
                }
            )
DELETE: if(window.confirm('Are you sure you want to delete that?'))
            firebaseDb.child(`contact/${key}`).remove(
                err => {
                    if(err)
                        console.log(err);
                    else
                        setCurretID('');
                }
            ) 
*/