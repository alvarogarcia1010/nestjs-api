export function formatJsonApiResponse(data: any | any[], type: string) {
  if (data === null) {
    return {
      data: {},
      meta: {
        success: true,
      }
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
    meta: {
      success: true,
    }
  };
}

export default formatJsonApiResponse