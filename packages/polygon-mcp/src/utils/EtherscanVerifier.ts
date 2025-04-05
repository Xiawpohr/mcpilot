export class EtherscanVerifier {
  public apiKey: string;
  public apiUrl: string;
  public explorerUrl: string;

  constructor(apiKey: string, apiUrl: string, explorerUrl: string) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
    this.explorerUrl = explorerUrl;
  }

  async verify(
    contractAddress: string,
    sourceCode: string,
    contractName: string,
    compilerVersion: string,
    constructorArguments: string
  ): Promise<EtherscanResponse> {
    const formData = new FormData()
    formData.append('apikey', this.apiKey)
    formData.append('module', 'contract')
    formData.append('action', 'verifysourcecode')
    formData.append('codeformat', 'solidity-standard-json-input')
    formData.append('sourceCode', sourceCode)
    formData.append('contractaddress', contractAddress)
    formData.append('contractname', contractName)
    formData.append('compilerversion', compilerVersion)
    formData.append('constructorArguements', constructorArguments)

    const url = new URL(this.apiUrl + '/api')

    const response = await fetch(url.href, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const responseText = await response.text()
      throw new Error(responseText)
    }

    const verificationResponse: EtherscanVerifyResponse = await response.json()
    const etherscanResponse = new EtherscanResponse(verificationResponse)

    if (etherscanResponse.isBytecodeMissingInNetworkError()) {
      throw new Error(etherscanResponse.message);
    }

    if (etherscanResponse.isAlreadyVerified()) {
      throw new Error(etherscanResponse.message);
    }

    if (!etherscanResponse.isOk()) {
      throw new Error(etherscanResponse.message);
    }

    return etherscanResponse;
  }

  getContractCodeUrl(address: string): string {
    const url = new URL(this.explorerUrl + `/address/${address}#code`)
    return url.href
  }
}

interface EtherscanVerifyNotOkResponse {
  status: "0";
  message: "NOTOK";
  result: string;
}

interface EtherscanVerifyOkResponse {
  status: "1";
  message: "OK";
  result: string;
}

export type EtherscanVerifyResponse =
  | EtherscanVerifyNotOkResponse
  | EtherscanVerifyOkResponse;

class EtherscanResponse {
  public readonly status: number;
  public readonly message: string;

  constructor(response: EtherscanVerifyResponse) {
    this.status = parseInt(response.status, 10);
    this.message = response.result;
  }

  public isPending() {
    return this.message === "Pending in queue";
  }

  public isFailure() {
    return this.message === "Fail - Unable to verify";
  }

  public isSuccess() {
    return this.message === "Pass - Verified";
  }

  public isBytecodeMissingInNetworkError() {
    return this.message.startsWith("Unable to locate ContractCode at");
  }

  public isAlreadyVerified() {
    return (
      // returned by blockscout
      this.message.startsWith("Smart-contract already verified") ||
      // returned by etherscan
      this.message.startsWith("Contract source code already verified") ||
      this.message.startsWith("Already Verified")
    );
  }

  public isOk() {
    return this.status === 1;
  }

  public toString() {
    return JSON.stringify({
      status: this.status,
      message: this.message,
    })
  }
}
