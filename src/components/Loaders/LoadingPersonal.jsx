import { Flex, Skeleton } from 'antd';

const LoadingPersonal = () => {
    return (
        <div className="mt-20 mx-20">
            <Flex justify="end">
                <Skeleton.Input active/>
            </ Flex>
            <div className="relative mt-32 max-w-full max-h-full">
                <Flex justify="space-between" align="flex-start" gap={"middle"}>
                    <Flex justify="space-between" align="flex-start" vertical gap={"middle"}>
                        <span className="absolute bottom-0"><Skeleton.Input active /></span>
                        <Skeleton.Input active/>
                        <span className="pl-10"><Skeleton.Input active /></span>
                        <span className="pl-10"><Skeleton.Input active /></span>
                        <span className="pl-10"><Skeleton.Input active /></span>
                    </Flex>
                    <div className="mx-auto">
                        <Flex vertical gap={"middle"}>
                            <Skeleton.Input active/>
                            <Flex gap={"middle"} vertical>
                                <Skeleton.Input active/>
                                <Skeleton.Image active/>
                            </Flex>

                            <Flex gap={"large"} className="mt-10">
                                <Skeleton.Input active />
                                <Skeleton.Input active />
                                <Skeleton.Input active />
                            </Flex>

                            <Flex vertical gap={"middle"} className="mt-10">
                                <Skeleton.Input active/>
                                <Skeleton.Input active/>
                                <Flex justify="space-between" align="center">
                                    <Flex gap={"middle"} className="mt-10">
                                        <Skeleton.Avatar active />
                                        <Skeleton.Avatar active />
                                        <Skeleton.Avatar active />
                                        <Skeleton.Avatar active />
                                    </Flex>
                                    <Flex className="mt-10">
                                        <Skeleton.Input active />
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    </div>
                </Flex>
            </div>
        </div>
    )
}

export default LoadingPersonal