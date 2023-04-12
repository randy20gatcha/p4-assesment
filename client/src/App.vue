<template>
 <!-- v-if="state.username === '' || state.username === null" -->
  <div  align="center">
    <v-card max-width="500" max-height="300">
                        
      <v-card-item class="mt-8">
        <v-col>
          <v-text-field 
            label="Username" 
            variant="outlined"
            v-model="inputUsername"
          />
        </v-col>
      </v-card-item>  
                                    
      <v-card-actions class="mt-n6">
        <v-col class="text-center">
          <v-btn block @click="login">Signin</v-btn>
        </v-col>
      </v-card-actions>                                                              
                                                          
    </v-card>
  </div>

  <div >
    <header>
      <button class="logout" @click="Logout">Logout</button>
      <h1>Welcome, {{ state.username }}</h1>
    </header>

    <section>
      <v-card  max-width="600" max-height="400">
       <v-card-item>
        <div 
       >
        <ul  v-for="message in state.messages"
        :key="message">
          <li>{{ message }}</li>
        </ul>

      </div>
       </v-card-item>
      </v-card>
    </section>

    <footer class="mt-5">
      
        <v-row>
          <v-col>
            <v-text-field 
              v-model="inputMessage" 
              placeholder="Write a message..." 
              variant="outlined"
            />
          </v-col>
          <v-col>
            <v-btn @click="sendMessage">send</v-btn>
          </v-col>
        </v-row>
        
     
    </footer>
  </div>

</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import { getDatabase, ref as REF, set, onValue, push } from "firebase/database";
import app from './firebase';

export default {

  setup() {
    const inputUsername = ref("");
    const inputMessage = ref("");

    const state = reactive({
      username: "",
      messages: []
    });

    const login = () => {
      if(inputUsername.value != "" || inputUsername.value != null) {
        state.username = inputUsername.value;
        inputUsername.value = ""; 
      }
    }

    const sendMessage = () => {
      const db = getDatabase();
      const messagesRef = REF(db, 'messages');
      const newMessagesRef = push(messagesRef);
      if(inputMessage.value === "" || inputMessage.value === null) {
        return;
      }
      
      const message = {
        username: state.username,
        content: inputMessage.value
      }
      set(
        newMessagesRef, {
          msgs: message
        }
      );
      inputMessage.value = "";
    }

    onMounted(() => {
      const db = getDatabase();
      const messagesRef = REF(db, 'messages/');
      
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        // Object.keys(data).forEach(key => {
        //   messages.push({
        //     id: key,
        //     username: data[key].username,
        //     content: data[key].content
        //   });
        // });
        state.messages = data;
      });
      console.log(state.messages)
    });

    return {
      login,
      inputMessage,
      inputUsername,
      state,
      sendMessage
    }
  }
}
</script>

<style scoped>

</style>
