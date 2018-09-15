const DUMMY_DATA = [
  {
    senderId: "perborgen",
    text: "who'll win?"
  },
  {
    senderId: "janedoe",
    text: "Brazil!"
  }
]

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      messages: DUMMY_DATA
    }
  }

  render() {
    return (
      <div className="app">
        <Title />
        <MessageList messages={this.state.messages} />
        <SendMessageForm />
      </div>
    )
  }

}

class Title extends React.Component {

  render() { return null; }
}


class MessageList extends React.Component {

  render() {
    return (
      <ul className="message-list">
        {this.props.messages.map(message => {
          return (
            <li key={message.id}>
              <div>
                {message.senderId}
              </div>
              <div>
                {message.text}
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
}

class SendMessageForm extends React.Component {

  render() { return null; }
}

ReactDOM.render(<App />, document.getElementById('root'));
