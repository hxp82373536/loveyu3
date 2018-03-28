import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Table} from 'antd'

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
  showQuickJumper:true,
  total: 13,
  pageSize: 8,
  showTotal:(total)=>{
    return `共${total}条`
  },
  itemRender:(current, type, originalElement)=>{
  if (type === 'prev') {
    return <a>上一页</a>;
  } else if (type === 'next') {
    return <a>下一页</a>;
  }
  return originalElement;
}
  //showTotal:true,
  //onShowSizeChange: (current, pageSize) => {}
}

class CheckTable extends React.PureComponent {
  onOk() {
    console.info("onok")
    console.info(this.props)
    this.props.closeDetail()
  }

  onRecord(record) {
    console.info(record)
    let param = {
      imsi: record.imsi,
      imei: record.imei
    }
    return {
      onDoubleClick: () => {
        this.props.loadDetail(param)
      }
    }
  }

  render() {
    return (<div>
      <Table dataSource={this.props.result} loding={this.props.loading} size="middle" columns={columns} pagination={pagination} rowKey={(r, i) => (i)} onRow={this.onRecord.bind(this)}/>
      <Modal title="信令详情" visible={this.props.modalVisible} onOk={this.onOk.bind(this)} onCancel={this.onOk.bind(this)}>
        this.state.detail_result
      </Modal>
    </div>);
  }
}

CheckTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  result: PropTypes.array.isRequired
};

export default CheckTable;
