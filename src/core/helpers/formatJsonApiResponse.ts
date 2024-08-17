export function formatJsonApiResponse(data: any | any[], type: string, meta?: any) {
  if (data === null) {
    return {
      data: {},
      meta: meta ? { ...meta } : undefined
    }
  }

  if (Array.isArray(data)) {
    return {
      data: data.map(item => ({
        type: type,
        id: item.id,
        attributes: {
          ...item,
          id: undefined,
        },
      })),
      meta: meta ? { ...meta } : undefined
    };
  }

  return {
    data: {
      type: type,
      id: data.id,
      attributes: {
        ...data,
        id: undefined,
      },
    },
    meta: meta ? { ...meta } : undefined
  };
}

export default formatJsonApiResponse