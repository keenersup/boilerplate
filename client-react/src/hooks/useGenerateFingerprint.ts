import {useState, useEffect} from 'react';
import Fingerprint2 from 'fingerprintjs2'

/********* ********* ********* ********* ********* ********* ********* ********* *********
 Fingerprint asynchronous function
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
type GenerateTypes = {
    clientToken: string |null
    resetValues: () => void
}
export const useGenerateFingerprint = ({clientToken, resetValues}: GenerateTypes) => {
    const [clientId, setClientId] = useState('')
    useEffect(() => {
        getFingerprint().then((result) => {
            /********* ********* ********* ********* ********* ********* ********* ********* *********
             compare clientToken and new clientId
             ********* ********* ********* ********* ********* ********* ********* ********* *********/
            if (result !== clientToken) {
                resetValues()
            }
            setClientId(result)
        });
    }, [clientToken, resetValues])
    return {clientId}
}

const fingerprintOptions = {
    excludes: {
        availableScreenResolution: true,
        enumerateDevices: true,
    }
}

function fingerPrintHandle(resolve: (value: string) => void) {
    return Fingerprint2.get(fingerprintOptions, (components) => {
        const values = components.map(function (component) {
            // console.log({ key: component.key, value: component.value })
            return component.value
        })
        const murmur = Fingerprint2.x64hash128(values.join(), 31)
        resolve(murmur)
    })
}

function getFingerprint(): Promise<string> {
    return new Promise((resolve) => {
        if ((window as any).requestIdleCallback) {
            (window as any).requestIdleCallback(function () {
                fingerPrintHandle(resolve)
            })
        } else {
            setTimeout(function () {
                fingerPrintHandle(resolve)
            }, 500)
        }
    })
}