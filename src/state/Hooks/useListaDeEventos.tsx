import { useRecoilValue } from "recoil"
import { listaDeEventosState } from "../atom"

const useListaDeEventos = () =>{
    const eventos = useRecoilValue(listaDeEventosState)    

    return eventos
}

export default useListaDeEventos