import axios from 'axios';

export function fetchBusStop(nodeId: string | undefined, cityCode: number | undefined, name: string | undefined): Promise<void> {
  if (!nodeId || !cityCode || !name) {
    console.warn('Missing required parameters:', { nodeId, cityCode, name });
    return Promise.resolve();
  }

  console.log({ nodeId, cityCode, name });

  return axios
    .post('http://localhost:3333/api/stop-info', {
      nodeId,
      cityCode,
      name
    })
    .then((res) => {
      console.log('정류장 정보:', res.data);
      // 여기서 팝업 업데이트하거나 상태 업데이트
    })
    .catch(console.error);
}