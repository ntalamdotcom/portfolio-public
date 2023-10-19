import { Dispatch, FC, SetStateAction } from 'react';
export interface PageProps {
    SIGN_IN_PAGE: string;
    env: {
        NODE_ENV: string;
    };
    host: string;
    protocol: string;
    NEXTAUTH_URL?: string,
    HOME_URL: string;
    setIsProcessing: Dispatch<SetStateAction<boolean>>
}
export default function CheckSignInPage(WrappedComponent: FC<PageProps>) {
    const HOC: FC<PageProps> = (props) => {
        if (!props || !props.SIGN_IN_PAGE) {
            console.log('SignInPage is undefined');
           
            return <>
                <div>
                    no signinpage
                </div>
                <div>
                    {props.env && JSON.stringify(props.env)}
                </div>
                <div>
                    {!props.env && "undefined env"}
                </div>
            </>;
        }
        return <WrappedComponent {...props} />;
    };

    return HOC;
};