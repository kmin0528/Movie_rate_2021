import React from 'react';

class Detail extends React.Component {
    componentDidMount() { //Detail component가 마운트되면
        const { location, history } = this.props; // 구조 분해 할당으로 location,history를 얻는다.
    if (location.state == undefined) { //만약 location.state가 없는경우
        history.push('/'); //Home으로 이동
        }
    }

    render() {
        const {location} = this.props;
        if (location.state) {
        return <span>{location.state.title}</span>;
        }else{
        return null;
        }
    }
}

export default Detail;