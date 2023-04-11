

export const getSessionData = ()=>{
    // const wallet_address = sessionStorage.getItem('wallet_address');
    // console.log(wallet_address);
    try{
        if (window && window.sessionStorage) {
            const key = 'wallet_address';
            const stored = sessionStorage.getItem(key);
            if (!stored) {
              return;
            }
           
        }
        return stored;

    } catch(err){
        console.log(err);
    }
   
   

}
