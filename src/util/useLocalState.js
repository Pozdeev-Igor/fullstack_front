import { useEffect, useState } from "react";

function useLocalState() {
   const localStorageValue = localStorage.getItem('jwt');

   return localStorageValue ? true : false
}

export {useLocalState};