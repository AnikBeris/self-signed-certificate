# Install 3x-ui and certificates for 10 years

# Установка OpenSSL
if ! command -v openssl &> /dev/null; then # <- проверка на наличие установленного пакета
  sudo apt update && sudo apt install -y openssl # <- обновление и установка пакета
  if [ $? -ne 0 ]; then # <- проверка на успешность установки
    exit 1
  fi
else
  echo "Open SSL уже установлен." # <- сообщение о том, что пакет уже установлен
fi

# Установка qrencode
if ! command -v qrencode &> /dev/null; then # <- проверка на наличие установленного пакета
  sudo apt update && sudo apt install -y qrencode # <- обновление и установка пакета
  if [ $? -ne 0 ]; then # <- проверка на успешность установки
    exit 1
  fi
else
  echo "qrencode уже установлен." # <- сообщение о том, что пакет уже установлен
fi

# Ожидание нажатия Enter
wait_for_enter() {
  echo -e "чтобы продолжить нажмите Enter"
  read -r
}

# Установка 3X-UI
if ! command -v x-ui &> /dev/null; then # <- проверка на наличие установленного пакета
  bash <(curl -Ls https://raw.githubusercontent.com/mhsanaei/3x-ui/master/install.sh) # <- обновление и установка пакета
  if [ $? -ne 0 ]; then # <- проверка на успешность установки
    exit 1
  fi
else
  echo "3X-UI уже установлен." # <- сообщение о том, что пакет уже установлен
fi

# Запуск 3X-UI
systemctl daemon-reload
if systemctl list-units --full -all | grep -Fq 'x-ui.service'; then
  systemctl enable x-ui
  systemctl start x-ui
else
  x-ui
fi

# ASCII-арт
cat << "EOF"
============================================================
       SUBSCRIBE US ON YOUTUBE: AnikBer
============================================================
EOF

# QR-код для чаевых
echo "############################################################"
echo "#                    QR-КОД ДЛЯ ЧАЕВЫХ                     #"
echo "############################################################"
TIP_LINK="https://pay.cloudtips.ru/p/7249ba98"
qrencode -t ANSIUTF8 "$TIP_LINK"
wait_for_enter

# Разделитель из 3 строк
for i in {1..4}; do echo "============================================================"; done

# QR-код YouTube
echo "############################################################"
echo "#                      QR-КОД YOUTUBE                      #"
echo "############################################################"
YT_LINK="https://www.youtube.com/@UnrealDevZon"
qrencode -t ANSIUTF8 "$YT_LINK"
wait_for_enter

# Разделитель из 3 строк
for i in {1..4}; do echo "============================================================"; done



# Генерация сертификата
CERT_DIR="/etc/ssl/self_signed_cert"
CERT_NAME="self_signed"
DAYS_VALID=3650
mkdir -p "$CERT_DIR"
CERT_PATH="$CERT_DIR/$CERT_NAME.crt"
KEY_PATH="$CERT_DIR/$CERT_NAME.key"

openssl req -x509 -nodes -days $DAYS_VALID -newkey rsa:2048 \
  -keyout "$KEY_PATH" \
  -out "$CERT_PATH" \
  -subj "/C=US/ST=State/L=City/O=Organization/OU=Department/CN=example.com"

if [ $? -eq 0 ]; then
  echo "SSL CERTIFICATE PATH: $CERT_PATH"
  echo "SSL KEY PATH: $KEY_PATH"
else
  exit 1
fi

# Финальное сообщение
for i in {1..2}; do echo "============================================================"; done
echo "   Установка завершена, ключи сгенерированы!"
echo "   Пропишите ключи в панели управления 3x-ui"
echo "1) Пройдите по ссылке сверху, введи логин и пароль, который сгенерировал скрипт"
echo "2) После перейдиртре в Настройки панели"
echo "3) Путь к файлу ПУБЛИЧНОГО ключа сертификата -> /etc/ssl/self_signed_cert/self_signed.crt"
echo "4) Путь к файлу ПРИВАТНОГО ключа сертификата -> /etc/ssl/self_signed_cert/self_signed.key"
echo "5) Сохраните и перезагрузите панель"

echo "============================================================"
