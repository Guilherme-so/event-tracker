import { useRecoilValue } from "recoil"
import { eventosFiltradosState } from "../selector"

const useListaDeEventos = () =>{
    const eventos = useRecoilValue(eventosFiltradosState)    
    return eventos
}

export default useListaDeEventos