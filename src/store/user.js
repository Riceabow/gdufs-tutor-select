import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore('user',()=>{
    const requestHeader = ref({})
    const userRole = ref('')
    const userInfo = ref({})
    const count = ref(1)
    const doubleCount = computed(()=>{
        count.value*2
    })
    function increment(){
        count.value++
    }
    return {requestHeader,userInfo,userRole}
},
{
    persist: {
        storage: sessionStorage,
    }
}
)