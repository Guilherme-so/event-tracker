import Kalend, { CalendarEvent, CalendarView, OnEventDragFinish } from 'kalend'
import ptBR from './localizacao/ptBR.json'
import 'kalend/dist/styles/index.css';
import style from './Calendario.module.scss';
import { useRecoilValue } from 'recoil';
import { listaDeEventosState } from '../../state/atom';
import useAtualizarEvento from '../../state/Hooks/useAtualizarEvento';

interface IKalendEvento {
  id?: number
  startAt: string
  endAt: string
  summary: string
  color: string
}

const Calendario = () => {
  const eventosKalend = new Map<string, IKalendEvento[]>();
  // quando for so pega os valores useRecoilValue
  const eventos = useRecoilValue(listaDeEventosState)

  const atualizarEvento = useAtualizarEvento()

  eventos.forEach(evento => {
    const chave = evento.inicio.toISOString().slice(0, 10)
    if (!eventosKalend.has(chave)) {
      eventosKalend.set(chave, [])
    }
    eventosKalend.get(chave)?.push({
      id: evento.id,
      startAt: evento.inicio.toISOString(),
      endAt: evento.fim.toISOString(),
      summary: evento.descricao,
      color: 'blue'
    })
  })


  const onEventDragFinish: OnEventDragFinish = (
    kalendEventoInalterado: CalendarEvent,
    KalendEventoAtualizado: CalendarEvent,
    ) => {
      const evento = eventos.find(evento => evento.descricao === KalendEventoAtualizado.summary)
      if(evento) {
        const eventoAtualizado = {
          ...evento
        }
        eventoAtualizado.inicio = new Date(KalendEventoAtualizado.startAt)
        eventoAtualizado.fim = new Date(KalendEventoAtualizado.endAt)
        atualizarEvento(eventoAtualizado)
      }
    };

  return (
    <div className={style.Container}>
      <Kalend
        events={Object.fromEntries(eventosKalend)}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        initialView={CalendarView.WEEK}
        timeFormat={'24'}
        weekDayStart={'Monday'}
        calendarIDsHidden={['work']}
        language={'customLanguage'}
        customLanguage={ptBR}
        onEventDragFinish={onEventDragFinish}
      />
    </div>
  );
}

export default Calendario