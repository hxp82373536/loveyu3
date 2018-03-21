import React from 'react';
import PropTypes from 'prop-types';
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
  render() {
    return (<Table dataSource={this.props.signallingList} columns={columns} rowKey={(r, i) => (i)}/>);
  }
}

CheckTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  signallingList: PropTypes.array.isRequired
};

export default CheckTable;
