import VerifyClient from "./VerifyClient";

export default function Page({ searchParams }) {
    return (
        <VerifyClient
            uid={searchParams.uid}
            hash={searchParams.hash}
        />
    );
}