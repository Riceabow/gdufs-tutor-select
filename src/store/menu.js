import { defineStore } from "pinia";
import { ref } from "vue";

export const useMenuStore = defineStore('menu',()=>{
    const menuOpNowAdmin = ref('')
    const menuOpNowTeacher= ref('')
    const menuOpNowStudent = ref('')

    return {menuOpNowAdmin,menuOpNowTeacher,menuOpNowStudent}
},
{
    persist: {
        storage: sessionStorage,
    }
}
)