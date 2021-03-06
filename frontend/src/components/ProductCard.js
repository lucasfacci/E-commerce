import { Card } from 'antd';

const { Meta } = Card;

export const ProductCard = props => {
    return (
        <Card
            hoverable
            style={{ width: 240, height: 350, display: "table", margin: "0 auto" }}
            cover={<img alt={props.alt} src={props.src} />}
        >
            <b><Meta title={props.name} description={`R$${props.price}`} style={{ fontFamily: "'Lucida Console', 'Courier New', monospace", textTransform: 'uppercase' }} /></b>
        </Card>
    )
}