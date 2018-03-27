import React from 'react';
import PropTypes from 'prop-types';
import {Modal,Table} from 'antd'

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

let pagination = {
    total: 100,
    //defaultCurrent: page,
    pageSize: 5,
    showSizeChanger: true,
    onShowSizeChange: (current, pageSize) => {
        },
  }

class CheckTable extends React.PureComponent {
  render() {
    return (
      <div>
      <Table
        dataSource={this.props.result}
        loding={this.props.loading}
        size="middle"
        columns={columns}
        pagination={pagination}
        rowKey={(r, i) => (i)}
        onRow={(record) => {
            return {
              onDoubleClick:()=>{
                this.props.loadDetail()
          }
        }}}/>
    <Modal title="信令详情" visible={this.props.modalVisible}>
       <p>Some contents...</p>
    </Modal>
    </div>
    );
  }
}

CheckTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  result: PropTypes.array.isRequired
};

export default CheckTable;
