import { useSetRecoilState } from "recoil"
import { listaDeEventosState } from "../atom"
import { IEvento } from "../../interfaces/IEvento"
import { userId } from "../../util"

const useAdicionarEvento = () => {
    const setEventos = useSetRecoilState<IEvento[]>(listaDeEventosState)

    return (evento: IEvento) => {
        const hoje = new Date()
        if(evento.inicio < hoje){
            throw new Error("O evento nao pode ser no passado")
        }
        evento.id = userId()
        return setEventos(listaAntiga => [...listaAntiga, evento])
    }
}

export default useAdicionarEvento