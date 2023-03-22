class ProductList extends React.Component{
    constructor(props){
        super(props);

        this.state={
            products:[],
        };

        this.handleProductUpVote = this.handleProductUpVote.bind(this);
    }

    componentDidMount(){
        this.setState({ products: Seed.products });
    }

    handleProductUpVote(productId){
        console.log(productId + ' was upvoted.');
        const nextProducts=this.state.products.map((product)=>{
            if (product.id === productId){
                console.log(product)
                return Object.assign({},product,{
                    votes: product.votes + 1,
                });
            }else{
                return product;
            }
        });
        this.setState({
            products: nextProducts,
        });
    }
    render(){
        /* 加载一个子组件
        const product=Seed.products[0];
        return(
            <div className='ui unstackable items'>
                <Product 
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    url={product.url}
                    votes={product.votes}
                    submitterAvatarUrl={product.submitterAvatarUrl}
                    productImageUrl={product.productImageUrl}
                    />
            </div>
        ); */
        const products=this.state.products.sort((a,b)=>(
            b.votes-a.votes
        ));
        const productComponents=products.map((product)=>(
            <Product
                key={'product-' + product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                url={product.url}
                votes={product.votes}
                submitterAvatarUrl={product.submitterAvatarUrl}
                productImageUrl={product.productImageUrl}
                onVotes={this.handleProductUpVote}
            />
        ));
        return(
            <div className='ui unstackable items'>
                {productComponents}
            </div>
        )
    }
}

class Product extends React.Component{
    // 手动绑定自定义组件
    constructor(props){
        super(props);//总是先调用该方法
        //自定义方法在这里绑定
        this.handleUpVote = this.handleUpVote.bind(this);
    }
    handleUpVote(){
        this.props.onVotes(this.props.id);
    }
    render(){
        return(
            <div className='item'>
                <div className='image'>
                    <img src={this.props.productImageUrl}/>
                </div>
                <div className='middle alignet conent'>
                    <div className='header'>
                        <a onClick={this.handleUpVote}>
                            <i className='large caret up icon'/>
                        </a>
                        {this.props.votes}
                    </div>
                    <div className='description'>
                        <a href={this.props.url}>{this.props.title}</a>
                        <p>{this.props.description}</p>
                    </div>
                    <div className='extra'>
                        <span>Submitted by:</span>
                        <img 
                            className='ui avatar image' 
                            src={this.props.submitterAvatarUrl}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


ReactDOM.render(
    <ProductList/>,
    document.getElementById('content')
)