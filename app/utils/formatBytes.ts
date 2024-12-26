export const formatBytes = (bytes: number) => {
	if (bytes < 0) {
		throw new Error("Bytes value must be non-negative");
	}

	const units = ["Bytes", "KB", "MB", "GB"];
	let index = 0;

	while (bytes >= 1024 && index < units.length - 1) {
		bytes /= 1024;
		index++;
	}
    
	return `${bytes.toFixed(2)} ${units[index]}`;
};
