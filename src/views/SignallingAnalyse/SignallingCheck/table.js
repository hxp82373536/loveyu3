import React from 'react';
import {Table} from 'antd'

const columns = [
  {
    title: 'IMSI',
    dataIndex: 'imsi',
    key: 'imsi'
  }, {
    title: 'IMEI',
    dataIndex: 'imei',
    key: 'imei'
  }, {
    title: '发送时间',
    dataIndex: 'sendtime',
    key: 'sendtime'
  }, {
    title: '本机号码',
    dataIndex: 'phonenumber',
    key: 'phonenumber'
  }, {
    title: '对端号码',
    dataIndex: 'towardnumber',
    key: 'towardnumber'
  }, {
    title: 'SMS',
    dataIndex: 'sms',
    key: 'sms'
  }, {
    title: '主从模式',
    dataIndex: 'mode',
    key: 'mode'
  }, {
    title: '4G基站号',
    dataIndex: 'basestation',
    key: 'basestation'
  }
];

class CheckTable extends React.PureComponent {
  componentWillMount() {
     console.info(this.props.loadSignallings);
     this.props.loadSignallings;
     console.info(this.props.loadSignallings);
  }
  render() {
    return (<Table dataSource={this.props.signallingList} columns={columns}/>);
  }

}

export default CheckTable;
