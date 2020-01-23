import socket
import struct
import time


def decode(msg):
    mac_dst = struct.unpack('!BBBBBB', msg[0:6])
    mac_dst = ":".join([hex(part)[2:].zfill(2) for part in mac_dst])
    mac_src = struct.unpack('!BBBBBB', msg[6:12])
    mac_src = ":".join([hex(part)[2:].zfill(2) for part in mac_src])
    ether_type = struct.unpack('!H', msg[12:14])
    ether_type = ":".join([hex(part)[2:].zfill(4) for part in ether_type])
    if ether_type == "0800":
        protocole = struct.unpack('!B', msg[23:24])
        protocole = ":".join([hex(part)[2:] for part in protocole])
        if protocole == '6':
            port_destination = struct.unpack('!H', msg[36:38])[0]
            if port_destination == 80:
                if len(msg[54:]) > 0:
                    message = msg[54:].decode(errors="ignore")
                print(
                    f"{time.time()}: DST_MAC: {mac_dst} - "
                    f"SRC_MAC: {mac_src} - "
                    f"ETHER_TYPE: {ether_type} - "
                    f"PROTOCOLE: {protocole} - "
                    f"PORT DESTINATION: {port_destination} - "
                    f'MESSAGE TA MERE : {message} - '
                )


def main():
    s = socket.socket(
            socket.AF_PACKET,
            socket.SOCK_RAW,
            socket.htons(3),
    )
    s.bind(("enp68s0", 3))

    try:
        print("Sniffer started")
        while True:
            msg = s.recv(1024)
            decode(msg)
    except KeyboardInterrupt:
        print("Sniffer stopped")


if __name__ == "__main__":
    main()