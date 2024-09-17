
export async function invokeApi(api,acceptData = null,emitData = null,detail = false) {
    if(detail){
        acceptData.value = await api(emitData)
    }
    else{
        const { code,message,data } = await api(emitData)
        console.log(code,message)
        if(acceptData){
          acceptData.value = data
        }
    }

  }