<template>
  <div  align="center" v-if="state.username === '' || state.username === null">
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

  <div v-else>
    <header>
      <button class="logout" @click="logout">Logout</button>
      <h1>Welcome, {{ state.username }}</h1>
    </header>

    <section class="chat-box">
      <div 
        v-for="message in state.messages" 
        :key="message.key" 
        :class="(message.username == state.username ? 'message current-user' : 'message')">
        <div class="message-inner">
          <div class="username">{{ message.username }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
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
import { reactive, ref, onMounted, watchEffect } from 'vue';
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

    const logout = () => {
      state.username = "";
    }

    const sendMessage = () => {
      const db = getDatabase();
      const messagesRef = REF(db);
      const newMessagesRef = push(messagesRef);
      if(inputMessage.value === "" || inputMessage.value === null) {
        return;
      }
      
      const message = {
        username: state.username,
        content: inputMessage.value
      }
      set(newMessagesRef, { message } );
      inputMessage.value = "";
    }

    onMounted(() => {
      const db = getDatabase();
      const messagesRef = REF(db);
      
      try {
          onValue(messagesRef, (snapshot) => {
          const data = snapshot.val();
          let messages = [];
          Object.keys(data).forEach(key => {
            messages.push({
              id: key,
              username: data[key].message.username,
              content: data[key].message.content
            });
          });
          state.messages = messages;
        });
      }
      catch(err) {
        console.log("message is:", err.message)
      }
      
    });

    return {
      login,
      logout,
      inputMessage,
      inputUsername,
      state,
      sendMessage
    }
  }
}
</script>

<style scoped lang="scss">
.chat-box {
			border-radius: 24px 24px 0px 0px;
			background-color: #FFF;
			box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
			flex: 1 1 100%;
			padding: 30px;
			.message {
				display: flex;
				margin-bottom: 15px;
				
				.message-inner {
					.username {
						color: #888;
						font-size: 16px;
						margin-bottom: 5px;
						padding-left: 15px;
						padding-right: 15px;
					}
					.content {
						display: inline-block;
						padding: 10px 20px;
						background-color: #F3F3F3;
						border-radius: 999px;
						color: #333;
						font-size: 18px;
						line-height: 1.2em;
						text-align: left;
					}
				}
				&.current-user {
					margin-top: 30px;
					justify-content: flex-end;
					text-align: right;
					.message-inner {
						max-width: 75%;
						.content {
							color: #FFF;
							font-weight: 600;
							background-color: #ea526f;
						}
					}
				}
			}
		}
</style>
