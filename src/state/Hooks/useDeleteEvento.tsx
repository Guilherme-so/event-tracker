import { useSetRecoilState } from "recoil"
import { listaDeEventosState } from "../atom"
import { IEvento } from "../../interfaces/IEvento"

const useDeleteEvento = () => {
    const setEventos = useSetRecoilState<IEvento[]>(listaDeEventosState)

    return (evento: IEvento) => {
        return setEventos(antigoEvento => antigoEvento.filter(event => event.id !== evento.id) )
    }
}

export default useDeleteEvento