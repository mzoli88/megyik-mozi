import LoaderLineIcon from 'remixicon-react/LoaderLineIcon';
import React from 'react';

type IProps = {
}
type IState = {
    isMaskOn: Boolean;
}

var MASK: { ON: Function, OFF: Function };

export function maskOn() {
    MASK.ON();
}

export function maskOff() {
    MASK.OFF();
}


export default class SpinnerComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = { isMaskOn: false };
        MASK = this;
    }

    ON() {
        this.setState({
            isMaskOn: true
        });
    }

    OFF() {
        this.setState({
            isMaskOn: false
        });
    }

    render() {
        var SpinnerComponent;
        if (this.state.isMaskOn) {
            SpinnerComponent = <div className='SpinnerMask'><LoaderLineIcon size={120} /></div>;
        }
        return (
            <div>
                {SpinnerComponent}
            </div >
        );
    }

}