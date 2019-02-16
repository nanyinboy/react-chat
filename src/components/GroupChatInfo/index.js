import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserAdapter from '../UserAvatar';
import './style.scss';

export default class GroupChatInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupMember: []
    };
  }

  componentDidMount() {
    const groupId = this.props.chatId;
    window.socket.emit('getGroupMember', groupId, (data) => {
      this.setState({ groupMember: data });
      console.log('this.state.groupMember', this.state.groupMember);
    });
  }

  GroupMemberRender = groupMember => (
    <ul className="members">
      {groupMember.length > 0 && groupMember.map(e => (
        <li key={e.user_id} className="member">
          <UserAdapter src={e.avatar} name={e.name} isGray={!e.status} />
          <span className="memberName">{e.name}</span>
        </li>
      ))}
    </ul>
  );

  render() {
    const groupNotice = 'test';
    const { groupMember } = this.state;
    groupMember.sort((a, b) => b.status - a.status);
    console.log('groupMember', groupMember);
    // const onlineNumber = groupMember.filter((e)=> e.status);
    return (
      <div className="chat-information">
        <div className="info">
          <p>群公告</p>
          <p>{groupNotice}</p>
        </div>
        {this.GroupMemberRender(groupMember)}
        <p className="leave" onClick={this.props.leaveGroup}>退出群聊</p>
      </div>
    );
  }


  get userInfo() {
    return JSON.parse(localStorage.getItem('userInfo'));
  }
}

GroupChatInfo.propTypes = {
  leaveGroup: PropTypes.func.isRequired,
  chatId: PropTypes.string.isRequired
};


GroupChatInfo.defaultProps = {
};