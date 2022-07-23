import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => {
    if (!state.notification) {
      return state.notification;
    }
    if (state.notification.type === "vote") {
      const activeAnecdote = state.anecdotes.find(
        (anecdote) => anecdote.id === state.notification.data
      );
      return activeAnecdote
        ? `you voted '${activeAnecdote.content}'`
        : state.notification;
    }
    return `you created '${state.notification.data}'`;
  });
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  if (notification) {
    return <div style={style}>{notification}</div>;
  }
  return null;
};

export default Notification;
