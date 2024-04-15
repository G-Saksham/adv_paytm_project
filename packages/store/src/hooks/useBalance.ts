import {useRecoilValue} from "recoil";
import { balanceAtom } from "../atoms/balance";

export const useBalance = () => {
    const balanceValue = useRecoilValue<number>(balanceAtom);
    return balanceValue;
}