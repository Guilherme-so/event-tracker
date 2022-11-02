import useListaDeEventos from "../../state/Hooks/useListaDeEventos";
import Evento from "../Evento";
import Filtro from "../Filtro";
import style from "./ListaDeEventos.module.scss";

interface Props {
  aoFiltroAplicado: (data: Date | null) => void;
}

const ListaDeEventos = ({aoFiltroAplicado }: Props) => {
  const eventos = useListaDeEventos()
  
  return (
    <section>
      <Filtro aoFiltroAplicado={aoFiltroAplicado} />
      <div className={style.Scroll}>
        {eventos.map((evento) => (
          <Evento
            evento={evento}
            key={evento.id}
          />
        ))}
      </div>
    </section>
  );
};

export default ListaDeEventos;
