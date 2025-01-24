import { Row, Col, Card, Skeleton } from 'antd';

const AdCardSkeleton = () => {
    const skeletonContent = (
        <Skeleton loading={true} active avatar>
            
            <Card.Meta
                avatar={<Skeleton.Avatar active size="large" />}
                title="Ad Title"
                description="Ad Description"
            />
        </Skeleton>
    );

    return (
        <Row gutter={[16, 16]}>
            
            <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card style={{ width: '100%' }}>{skeletonContent}</Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card style={{ width: '100%' }}>{skeletonContent}</Card>
            </Col>
           
        </Row>
    );
};

export default AdCardSkeleton;
