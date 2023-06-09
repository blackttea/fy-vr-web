import { Card, Col, Row } from 'antd';
import React from 'react';
import RShow from "../../components/rShow";

const dashboard: React.FC = () => (
  <Row gutter={16}>
    <Col span={8}>
      <Card title="Card title" bordered={false}>
        <RShow show={'add'}>
          <p>666666</p>
        </RShow>
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Card title" bordered={false}>
        dashboard
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Card title" bordered={false}>
        dashboard
      </Card>
    </Col>
  </Row>
);

export default dashboard;
