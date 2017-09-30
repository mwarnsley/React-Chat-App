import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import io from 'socket.io-client';

import SideBar from './Sidebar/SideBar';
import MessageForm from './Messages/MessageForm';

class Chat extends Component {
  constructor() {
    super();

    this.state = {
      status: 'disconnected',
      messages: [
        {
          timeStamp: Date.now(),
          text: 'Welcome to Chatter Box',
        },
      ],
      users: [],
      user: '',
    };
  }
  componentWillMount = () => {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('messageAdded', this.messageAdded);
  };
  connect = () => {
    this.setState({
      status: 'connected',
    });
    console.log(`Connected: ${this.socket.id}`);
  };
  emit = (eventName, payload) => {
    this.socket.emit(eventName, payload);
  };
  disconnect = () => {
    this.setState({
      status: 'disconnected',
    });
  };
  messageAdded = message => {
    const messages = this.state.messages.concat(message);
    this.setState({
      messages,
    });
  };
  render() {
    console.log('State Messages: ', this.state.messages);
    return (
      <div id="chat_app_container">
        <div className="header-container">
          <h1 className="chatter-box-title-container">
            <i className="fa fa-comments chatter-logo" aria-hidden="true" />
            <span className="chatter-box-title">Chatter Box</span>
          </h1>
        </div>
        <SideBar />
        <div className="content-container">
          <Grid>
            <Row>
              <Col md={4}>
                <MessageForm emit={this.emit} />
              </Col>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sagittis nunc eu lacinia mollis. Vivamus
              congue purus vitae nulla lobortis dictum. Aenean ut imperdiet enim. Aenean vel mi sodales, suscipit sem
              et, porta lectus. Aliquam nec imperdiet purus. Nam aliquam nibh massa, nec condimentum odio interdum non.
              Suspendisse dolor velit, laoreet nec felis vitae, tincidunt ultricies urna. In hac habitasse platea
              dictumst. Nullam ultrices volutpat mi, vitae consectetur turpis mattis id. Mauris tincidunt, tortor sit
              amet consequat viverra, urna ipsum mattis mi, a ullamcorper est ipsum vitae metus. Suspendisse nec urna at
              ex interdum pellentesque. Maecenas porta laoreet venenatis. Suspendisse nibh nibh, blandit eu suscipit ut,
              porta in dui. Maecenas fringilla est eget elementum ultricies. Aenean et elit leo. Pellentesque sit amet
              luctus sapien. Suspendisse a justo nec risus dapibus congue nec a eros. Morbi lobortis vestibulum ipsum
              non posuere. Nullam vitae tempus mauris. Donec rutrum tellus lorem, vitae bibendum urna efficitur at. Duis
              in arcu risus. Integer aliquet libero a mi vehicula fringilla. Nullam gravida ligula a urna efficitur
              malesuada. In nisl nunc, suscipit vitae lobortis a, fringilla a est. Maecenas sit amet felis id lacus
              fermentum vehicula. Mauris pulvinar sem suscipit suscipit interdum. Quisque mollis laoreet ipsum at
              sagittis. Aliquam erat volutpat. Donec convallis orci quis accumsan posuere. Quisque aliquet mauris ac
              metus faucibus fringilla. Nulla tincidunt luctus metus vel sodales. Quisque consequat vel orci in
              vulputate. Integer pretium lorem eget porttitor euismod. Pellentesque sagittis erat libero, vitae accumsan
              diam interdum vitae. Etiam ac nulla et mauris dapibus pellentesque vel vel quam. Sed lorem magna,
              venenatis auctor auctor quis, interdum eget massa. Nullam at dapibus risus. Aliquam euismod libero vitae
              faucibus bibendum. Aenean at lobortis nulla. Sed id massa vestibulum, commodo lorem quis, semper odio.
              Suspendisse fringilla nibh eros, eget finibus leo scelerisque non. Ut faucibus consectetur ornare. Duis
              porttitor imperdiet nulla, id pellentesque justo aliquet vel. Cras lorem est, consequat condimentum sapien
              sit amet, auctor dignissim lacus. Suspendisse ultrices ante eget velit egestas, vestibulum posuere turpis
              facilisis. Suspendisse efficitur mattis pharetra. Orci varius natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus. In urna odio, bibendum vitae pellentesque nec, tempus nec sapien. Donec
              blandit et neque scelerisque bibendum. Etiam mattis dignissim augue at efficitur. Duis vel fringilla ex,
              vitae vestibulum quam. Nulla ac urna fermentum, consectetur ipsum quis, placerat nibh. Aliquam imperdiet
              elementum sem, quis consequat nisi blandit sed. Nulla ac porttitor ante. Sed at vulputate ligula, vel
              sollicitudin ante. Duis non efficitur metus. Integer sodales efficitur venenatis. Ut volutpat dictum orci
              et viverra. Suspendisse consectetur diam enim, vitae finibus lorem euismod ut. Nulla venenatis hendrerit
              purus quis viverra. Morbi ultrices eleifend tortor quis eleifend. Praesent lacinia enim ut efficitur
              ornare. Sed ut lacinia diam. Donec interdum, ligula eget viverra sagittis, lacus diam sollicitudin eros,
              vitae pharetra odio massa eu augue. Praesent nec congue lacus, eu imperdiet metus. Etiam viverra dignissim
              turpis eget mattis. Curabitur ultrices, nulla in pharetra tristique, ante mauris pulvinar nulla, sed
              mollis lectus lorem at justo. Curabitur eget dui est. Integer efficitur semper nisi, at laoreet enim
              tristique quis. Proin at leo eu lacus molestie luctus. Etiam accumsan libero ac tortor lacinia tristique.
              Morbi rhoncus ipsum id arcu luctus suscipit. Proin ut porta risus. Phasellus molestie purus non nunc
              congue, nec vehicula libero aliquam. Vestibulum ac tempor nulla. Praesent consequat turpis id mollis
              dignissim. Suspendisse consequat ex enim, sit amet commodo ex dictum non. Pellentesque accumsan maximus
              tincidunt. Fusce magna dui, feugiat non nibh non, cursus fermentum libero. Praesent ac risus urna. Vivamus
              nec elementum nulla. Sed quis rhoncus nisi. Fusce neque ex, sollicitudin quis sapien nec, interdum
              dignissim nibh. Nullam scelerisque libero et justo aliquet suscipit. Vestibulum accumsan blandit quam
              euismod sagittis. In pharetra varius lobortis. Phasellus ac blandit nisi. Etiam mauris elit, vulputate
              tempor justo id, aliquet finibus risus. Sed volutpat augue non risus bibendum, gravida efficitur elit
              commodo. Duis feugiat lacus non fermentum dictum. Duis lobortis, sapien sed ornare imperdiet, libero erat
              aliquam leo, finibus ornare nisi justo quis ipsum. Fusce mollis, lectus convallis eleifend tempus, ex urna
              semper purus, ut ornare est velit ut felis. Donec vitae nunc sem. Maecenas dapibus odio eget tortor
              aliquet lacinia. Fusce varius malesuada faucibus. Aenean interdum tempus quam, sit amet sagittis risus
              finibus et. Mauris bibendum volutpat faucibus. Mauris vel accumsan orci. In sit amet quam est. Maecenas
              est justo, aliquam lacinia pretium vel, malesuada vitae mauris. Curabitur at scelerisque elit. Nam
              consectetur, neque non convallis scelerisque, quam sem volutpat ante, vitae blandit felis arcu at nunc.
              Nam mauris elit, efficitur sed mollis at, vehicula eget magna. Duis dui eros, euismod eget pulvinar non,
              venenatis vitae sapien. Etiam scelerisque mi ac consectetur imperdiet. Donec et placerat turpis.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In ornare
              placerat elit, vitae efficitur lectus malesuada nec. Sed posuere quis justo sit amet accumsan. In suscipit
              arcu felis, hendrerit cursus metus imperdiet vulputate. Morbi consequat nulla vel augue facilisis feugiat.
              Nulla facilisi. Vivamus sed odio vitae magna aliquet rutrum at ac lacus. Quisque consequat pulvinar
              sagittis. Curabitur sit amet sem non elit congue feugiat. Donec pharetra, arcu pellentesque accumsan
              sollicitudin, orci justo sollicitudin velit, ac molestie dolor ligula ac mauris. Fusce iaculis nisl vel
              vulputate interdum. Pellentesque id luctus erat. Donec lobortis tellus ligula, eget hendrerit felis
              finibus vitae. Aenean non lorem vitae libero scelerisque condimentum. Vestibulum commodo mauris id laoreet
              feugiat. Aenean pharetra a eros quis viverra. Donec in odio mauris. Sed elementum leo placerat dui
              consequat tincidunt. Sed sit amet sem eleifend, dapibus massa vitae, convallis justo. Nullam malesuada
              tortor ac hendrerit interdum. Suspendisse eleifend, erat a porta finibus, diam est egestas lorem, in
              dictum odio urna eget massa. Nam tempor vestibulum lectus, ut lobortis eros elementum eu. Aliquam vitae
              mattis nibh, fringilla placerat turpis. Vivamus faucibus, erat sit amet hendrerit molestie, neque leo
              cursus sapien, nec euismod ex purus id magna. Morbi sed dictum sem. Suspendisse eleifend metus nec lacus
              porta volutpat. Mauris non dolor dui. Donec scelerisque vulputate tortor, ut ultrices tellus dignissim ut.
              Donec molestie, risus pellentesque posuere laoreet, ante est finibus arcu, laoreet accumsan sem arcu quis
              mi. Aenean dapibus mauris enim, id sollicitudin risus congue vitae. Nam a mollis massa, egestas tristique
              enim. Nulla in massa tristique, lobortis tellus ac, interdum lacus. Phasellus non felis dui. Nunc
              hendrerit arcu nisl, ac tempor sapien dictum non. In hac habitasse platea dictumst. Proin porta luctus
              sodales. Nulla bibendum nisl ultricies odio luctus convallis iaculis vitae nibh. Sed id maximus ex.
              Curabitur placerat varius eros, a ornare velit dapibus tristique. Mauris sed diam sed quam ornare ultrices
              id id neque. In eu massa vitae massa eleifend venenatis. Vestibulum lacinia eu sem at vulputate. Quisque
              eu ante non libero tincidunt eleifend. Sed scelerisque fermentum nibh sit amet dignissim. Donec non porta
              ante. Nullam eleifend, risus eu commodo placerat, tellus elit porttitor ligula, eu fermentum nisl lectus
              non diam. Maecenas sapien velit, tincidunt a est at, convallis commodo turpis. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris ornare euismod aliquet. Cras
              turpis ante, ullamcorper in felis et, pulvinar ultricies nisl. Proin odio mauris, semper lobortis leo sit
              amet, venenatis sodales lectus. Quisque a sagittis dolor. Sed in eleifend orci. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Mauris sit amet enim ac quam iaculis laoreet quis ornare tellus.
              Quisque semper libero et diam rutrum, non viverra arcu fermentum. Ut cursus, purus eget fermentum
              consequat, odio augue dictum velit, a elementum ligula purus eu quam. Quisque mattis ut turpis eu
              condimentum. Donec dictum rhoncus leo, a efficitur tellus scelerisque id. Aenean consectetur tincidunt
              risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus ut nulla in velit imperdiet
              mollis in id neque. Nam nibh mauris, vestibulum ac enim ac, scelerisque sollicitudin turpis. Suspendisse
              at augue ut nunc auctor hendrerit. Curabitur eu iaculis sem, in laoreet libero. Donec et velit congue,
              pharetra ipsum ac, fermentum nunc. Curabitur feugiat eu enim quis lacinia. Nulla in dictum massa, in
              elementum massa. Maecenas et metus venenatis, ornare nibh eu, accumsan ligula. Nam non nisl in purus
              faucibus condimentum feugiat vel ex. Nulla quis enim ultricies, rutrum turpis vitae, dapibus tortor. Cras
              viverra, elit a dictum bibendum, ante dolor vehicula neque, ac placerat diam nulla sit amet ante.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam molestie
              lectus in bibendum placerat. Nullam venenatis, justo at rhoncus maximus, nisi nibh blandit nisi, in
              scelerisque purus purus lobortis tellus. Pellentesque rutrum posuere orci quis porttitor. Orci varius
              natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam rutrum condimentum
              convallis. Aliquam commodo finibus elementum. Morbi tincidunt nulla magna, nec luctus massa varius at.
              Phasellus at risus lacinia, mattis lectus nec, venenatis nisl. Praesent vel gravida tortor. Proin sed
              tellus massa. Donec eu viverra nisi. Ut sit amet augue rhoncus, vehicula sem in, ultricies ipsum. Donec
              massa ipsum, dignissim et ultricies vel, fringilla vulputate purus. Curabitur vulputate scelerisque erat
              ac luctus. Aliquam nulla urna, tempor vitae consectetur sagittis, egestas ac lacus. Aenean mattis
              vestibulum orci, sit amet suscipit ipsum volutpat ut. Vivamus id enim quis nisi ultricies hendrerit.
              Quisque fermentum commodo risus, in malesuada urna. Phasellus quis luctus orci. Mauris consectetur, sapien
              sed euismod consectetur, erat erat tempor dui, eu scelerisque risus quam ut felis. Donec vitae tempus
              diam, eu consequat tortor. Nunc vehicula risus eu nunc bibendum aliquam. Morbi eget mi euismod, fermentum
              sapien ornare, dictum dui. Nullam turpis enim, interdum et viverra nec, congue at nisi. Proin accumsan
              interdum massa, id scelerisque metus faucibus porttitor. Maecenas leo eros, sodales venenatis justo sit
              amet, feugiat ultrices odio. Praesent eget neque ac turpis ornare mollis id eu elit. Sed a molestie dolor.
              Etiam elit quam, euismod ac dolor vitae, vulputate tincidunt tellus. Sed sit amet massa mauris. Nam non
              viverra nibh, eu ullamcorper quam. Fusce sit amet augue erat. Maecenas aliquam suscipit risus et molestie.
              Integer in turpis odio. Nunc luctus arcu quis maximus pretium. Etiam tellus urna, iaculis vel arcu a,
              posuere hendrerit nunc. Nulla venenatis elit lorem, eu egestas mauris sollicitudin ac. Phasellus molestie
              ipsum nisl. Ut sit amet suscipit est, ut finibus mi. Mauris placerat turpis in eros euismod rutrum. Sed
              porta dapibus metus, vitae venenatis mi ornare a. Vivamus consectetur risus nec iaculis lobortis.
              Phasellus tincidunt placerat congue. Suspendisse eu justo nec tellus commodo cursus.
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Chat;
