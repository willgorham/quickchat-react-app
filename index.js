const instanceLocator = 'v1:us1:45cb8e6b-b38e-45ac-9cc6-fe90df67d1cc';
const testToken = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/45cb8e6b-b38e-45ac-9cc6-fe90df67d1cc/token';
const username = 'willgorham';
const roomId = 16256134;

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      messages: []
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: username,
      tokenProvider: new Chatkit.TokenProvider({
        url: testToken
      })
    });

    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      });
    });
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: roomId
    });
  }

  render() {
    return (
      <div className="app">
        <Title />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
      </div>
    );
  }

}

function Title() {
  return <p className="title">A Quick Chat App</p>;
}


class MessageList extends React.Component {

  render() {
    return (
      <ul className="message-list">
        {this.props.messages.map(message => {
          return (
            <li key={message.id} className="message">
              <div>
                {message.senderId}
              </div>
              <div>
                {message.text}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

class SendMessageForm extends React.Component {

  constructor() {
    super();
    this.state = {
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ''
    });
  }

  render() {
    return(
      <form
        className="send-message-form"
        onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Type your message and press ENTER"
          value={this.state.message}
          onChange={this.handleChange}
           />
          }
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
