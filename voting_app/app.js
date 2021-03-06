const ProductList = React.createClass({
  getInitialState: function(){
      return {
          products: [],
          sortMethod : 'Descending'
      };
  },
  componentDidMount: function(){
      this.updateState(this.state.sortMethod);
  },
  updateState: function(sortMethod){
    if(sortMethod === 'Descending'){
        const products = Data.sort((a,b) => a.votes > b.votes ? -1 : 1);
        this.setState({
            products: products,
            sortMethod: sortMethod
        });
    }else{
        const products = Data.sort((a,b) => a.votes > b.votes ? 1 : 1);
        this.setState({
            products: products,
            sortMethod: sortMethod
        });
    }
    
  },
  handleProductUpVote: function(productId){
      console.log(productId + " was upvoted");
      Data.forEach(e1 => {
          if(e1.id === productId){
              e1.votes++;
          }
      });
      this.updateState(this.state.sortMethod);
  },
  handleProductDownVote: function(productId){
      console.log(productId + " was downvoted");
      Data.forEach(e1 => {
          if(e1.id === productId){
              e1.votes--;
          }
      });
      this.updateState(this.state.sortMethod);
  },
  toggleSortingMethod: function(){
     const newMethod = this.state.sortMethod === 'Descending' ? 'Ascending' : 'Descending';
     this.updateState(newMethod)
  },
  render: function () {
    const products = this.state.products.map((product) =>{
        return(
            <Product
                key={'product-' + product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                url={product.url}
                votes={product.votes}
                submitter_avatar_url={product.submitter_avatar_url}
                product_image_url={product.product_image_url}  
                onUpVote={this.handleProductUpVote}  
                onDownVote={this.handleProductDownVote}
            />
        );
    });
    return (
        <div>
            <a onClick={this.toggleSortingMethod}>
                {this.state.sortMethod}
            </a>
        <div className='ui items'>
            {products}
        </div>
      </div>
    );
  },
});

const Product = React.createClass({
    handleUpVote: function(){
        this.props.onUpVote(this.props.id);
    },  
    handleDownVote: function(){
        this.props.onDownVote(this.props.id);
    },
    render: function(){
        return (
            <div className='item'>
                <div className='image'>
                <img src={this.props.product_image_url} />
                </div>
                <div className='middle aligned content'>
                <div className='ui grid'>
                    <div className='three wide column'>
                        <div className='ui basic center aligned segment'>
                            <a onClick={this.handleUpVote}>
                                <i className='large caret up icon'></i>
                            </a>
                            <p><b>{this.props.votes}</b></p>
                            <a onClick={this.handleDownVote}>
                                <i className="large caret down icon"></i>
                            </a>
                        </div>
                    </div>
                    <div className='twelve wide column'>
                    <div className='header'>
                        <a href={this.props.url}>
                        {this.props.title}
                        </a>
                    </div>
                    <div className='meta'>
                        <span></span>
                    </div>
                    <div className='description'>
                        <p>{this.props.description}</p>
                    </div>
                    <div className='extra'>
                        <span>Submitted by:</span>
                        <img
                        className='ui avatar image'
                        src={this.props.submitter_avatar_url}
                        />
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
});


ReactDOM.render(
    <ProductList />,
    document.getElementById('content')
);
